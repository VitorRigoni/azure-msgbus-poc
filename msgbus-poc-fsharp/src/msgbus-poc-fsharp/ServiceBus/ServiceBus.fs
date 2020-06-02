module ServiceBus

open System.Text
open Microsoft.Azure.ServiceBus
open System
open Newtonsoft.Json

let serviceBusConnectionString = "Endpoint=sb://msgbuspoc.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=MdL/f+EC7tuVjcmRM0hcKA9fR63YW9Y5ZyKXlW8T7aA="
let queueName = "poc"

type Policy = { Id: Guid; PolicyNumber: string;}

type MessageData =
  | StringData of string
  | PolicyData of Policy

let encode message =
  match message with
  | StringData data -> Encoding.UTF8.GetBytes data
  | PolicyData data -> Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(data))

let stringEncode (data: string) =
  Encoding.UTF8.GetBytes data

let createMessage (data: byte[]) =
  let queueClient = QueueClient(serviceBusConnectionString, queueName)
  let message = Message(data)
  (queueClient, message)

let send (queueClient: IQueueClient, message: Message) =
  queueClient.SendAsync(message)
    |> Async.AwaitTask
    |> Async.RunSynchronously
    |> Ok

let sendMessage body =
  encode body
  |> createMessage
  |> send