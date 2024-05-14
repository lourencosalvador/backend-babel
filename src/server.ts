import fastify from "fastify";

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";

import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { createEvent } from "./routes/create-events";
import { regiserForEvent } from "./routes/register-for-event";
import { getEvent } from "./routes/get-event";
import { getBadgeUser } from "./routes/get-badge-user";
import { Checkin } from "./routes/check-in";
import { getEventAttendes } from "./routes/get-events-attendees";

const app = fastify();

app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: 'Babel-Backend',
      description: 'Dando os andpoint para o client da aplicação Babel',
      version: '1.0.0'
    }
  },

  transform: jsonSchemaTransform,
});


app.register(fastifySwaggerUI, {
  routePrefix: '/docs'
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(createEvent);
app.register(regiserForEvent);
app.register(getEvent);
app.register(getBadgeUser);
app.register(Checkin);
app.register(getEventAttendes);

app
  .listen({ port: 5000 })
  .then(() => console.log("Servidor rodando da __Babel__"));
