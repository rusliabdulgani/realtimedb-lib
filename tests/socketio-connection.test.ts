import { Socket, io } from 'socket.io-client'
import SocketIOServerWrapper from '../src/index'
import express from 'express'
import { createServer } from 'http'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { Socket as SocketServer } from 'socket.io'

test('two plus two is four', () => {
  expect(2 + 2).toBe(4)
})
