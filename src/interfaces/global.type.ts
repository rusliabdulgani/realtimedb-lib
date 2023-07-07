import { createClient } from "redis"

interface WrapperOptions {
  adapter?: {
    redisServer?: string
  }
}

type RedisClientType = ReturnType<typeof createClient>

export { WrapperOptions, RedisClientType }