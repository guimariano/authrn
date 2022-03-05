interface UserData {
  name: string;
  email: string;
  cpf: string;
}

interface Response {
  token: string;
  user: UserData;
}

export function signInService(): Promise<Response> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        token: 'SOCORRO_NAO_QUERO_IR_PRA_GUERRA_PUTIN_MALDITO',
        user: {
          name: 'Mariano',
          email: 'mariano@teste.com',
          cpf: '005.537.010-10'
        }
      })
    }, 1000)
  })
}
