import { Request, Response } from 'express';

// tslint:disable: max-line-length
export function homePage(req: Request, res: Response): void {
  res.status(200).send(`
    <html>
    <head>
      <title>Currency Exchange API</title>
    </head>
    <body>
      <h1>Currency Exchange API</h1>
      <p>This Currency Exchange API is REST-ful and supports CORS, so it can also be used in web browsers.</p>
      <h2>Routes</h2>
      <h3>GET / (text/html)</h3>
      <p>Returns an HTML document with API routes and usage.</p>
      <h3>GET /convert (application/json)</h3>
      <p>Returns a JSON object with the converted currency, using the latest exchange target rates published by the European Central Bank.</p>
      <p>Query parameters:</p>
      <ul>
        <li><code>from</code>: 3-letter ISO code for the base currency.</li>
        <li><code>to</code>: 3-letter ISO code for the target currency.</li>
        <li><code>amount</code>: Amount to be converted, in base currency. Use a dot (<code>.</code>) as decimal separator, grouping separators are not allowed.</li>
        <li><code>precision</code>: (Optional) Floating point precision used for the calculations, default is <code>4</code>.</li>
      </ul>
      <p>Response:</p>
      <ul>
        <li><code>currency</code>: The target currency used for the conversion.</li>
        <li><code>amount</code>: The converted amount.</li>
      </ul>
    </body>
    </html>
  `);
}
