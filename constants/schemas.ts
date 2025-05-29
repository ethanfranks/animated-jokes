import { z } from "zod";

export const JokeSchema = z.object({
  id: z.number(),
  type: z.enum(["general", "knock-knock", "programming", "dad"]),
  setup: z.string(),
  punchline: z.string(),
});

export const JokeListSchema = z.array(JokeSchema);

export type Joke = z.infer<typeof JokeSchema>;
export type JokeList = z.infer<typeof JokeListSchema>;
