import fastify from "fastify";

import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { createEvent } from "./routes/create-events";
import { regiserForEvent } from "./routes/register-for-event";
import { getEvent } from "./routes/get-event";
import { getBadgeUser } from "./routes/get-badge-user";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);


app.register(createEvent)
app.register(regiserForEvent)
app.register(getEvent)
app.register(getBadgeUser)

app
  .listen({ port: 5000 })
  .then(() => console.log("Servidor rodando da __Babel__"));
