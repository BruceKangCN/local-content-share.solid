import { configureServerFunctionsServer } from "@solidjs/web/server-functions/server";

// Server functions refuse argument payloads over 1 MiB with 413 before
// dispatch, which makes every real upload fail. Uploads are the point of this
// app, so remove the bound. With `Infinity` the handler also skips buffering
// the body to enforce the limit and decodes the multipart request directly.
configureServerFunctionsServer({ bodySizeLimit: Infinity });
