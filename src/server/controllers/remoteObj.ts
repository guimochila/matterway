import { Request, Response } from 'express';

// Object simulating a db
const dataObject: {
    [k: string]: any;
} = {};

export function addRemoteObj(req: Request, res: Response) {
    const { keyName, data }: { keyName: string; data: any } = req.body;

    if (!keyName || !data) {
        res.status(400).json({ error: 'keyName or data field is missing.' });
        return;
    }

    if (dataObject[keyName]) {
        dataObject[keyName] = { ...dataObject[keyName], ...data };
        return res.end();
    }

    dataObject[keyName] = data;

    res.end();
}

export function getRemoteObj(req: Request, res: Response) {
    const obj: string = req.query.obj as string;

    if (!obj) {
        res.status(400).json({
            error:
                'Query param obj is missing. Please, let us know the name of the object',
        });
        return;
    }

    if (!dataObject[obj]) {
        res.status(404).json({
            error: `Remote object ${obj} not found.`,
        });
        return;
    }

    res.json(dataObject[obj]);
}
