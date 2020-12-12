export interface IConnectUserBroadcast {
  data: {
    msg: string
    socketId: string
    ip: string
    totalConnections: number
  }
}

export interface IConnectSelf {
  data: {
    msg: string
    socketId: string
    ip: string
    totalConnections: number
  }
}

export interface IDisconnectUserBroadcast {
  data: {
    msg: string
    socketId: string
    ip: string
    totalConnections: number
  }
}

export interface IMeConnected {
  data: {
    msg: string
    socketId: string
    totalConnections: number
  }
}

export interface IDeletedNote {
  data: {
    id: string
  }
}

interface INote {
  id: string
  title: string
  description: string
  priority?: number
}
export interface IUpdatedNote {
  data: INote
}
