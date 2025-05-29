import { z } from "zod";

export const JokeSchema = z.object({
  id: z.number(),
  type: z.enum(["general", "knock-knock", "programming", "dad"]),
  setup: z.string(),
  punchline: z.string(),
});

export type Joke = z.infer<typeof JokeSchema>;
