export default (express, mongoose, Term) => {
    const app = express();

    const CORS = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,OPTIONS,DELETE',
        'Access-Control-Allow-Headers': 'Content-Type,Accept,Access-Control-Allow-Headers',
    };

    const styles = `
        <style>
            body {
                background-color: lightyellow;
                width: 50%;
                margin: 0 auto;
                font-family: Arial, serif;
            }
            
            h1 {
                text-align: center;
            }
            
            .link {
                display: block;
                margin-bottom: 10px;
                padding: 10px;
                background-color: #f9bcdd;
                border-radius: 8px;
                font-size: 16px;
                text-decoration: none;
                color: darkblue;
            }
            
            .description {
                padding: 10px;
                text-indent: 1.5em;
                text-align: justify;
                line-height: 1.5;
            }
        </style>
    `;

    app
        .use((r, res, next) => { r.res.set(CORS); next(); })

        .get('/', async (req, res) => {
            const terms = await Term.find();

            let layout = `
                <!DOCTYPE html>
                <html lang="ru">
                <head>
                    <meta charset="UTF-8">
                    <title>Глоссарий</title>
                    ${styles}
                </head>
                <body>
                    <h1>Глоссарий</h1>
                    <div>
            `;

            terms.forEach((term) => {
                layout += `
                    <a class="link" href="/${term.name}">${term.title}</a>
                `;
            });

            layout += `
                    </div>
                </body>
                </html>
            `;

            res.send(layout);
        })
        .get('/:name', async (req, res) => {
            const { name } = req.params;

            const termInfo = await Term.find({ name });

            if (termInfo.length > 0) {
                res.send(`<!DOCTYPE html>
                    <html lang="ru">
                    <head>
                        <meta charset="UTF-8">
                        <title>${termInfo[0].title}</title>
                        ${styles}
                    </head>
                    <body>
                        <div>
                            <h1>${termInfo[0].title}</h1>
                            <p class="description">${termInfo[0].description}</p>
                            <br>
                            <a class="link" href="/">На главную</a>
                        </div>
                    </body>
                    </html>
                `);
            } else {
                res.send('Нет такого термина');
            }
        })
        .all('/*', (req, res) => res
            .send('Shtol Leonid'));

    return app;
};
