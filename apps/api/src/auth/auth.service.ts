import { BadRequestException, Injectable } from '@nestjs/common';
import { contain } from 'supertest/lib/cookies.js';

@Injectable()
export class AuthService {
  async getAccessToken(code: string) {
    const response = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          //Describe el formato de lo que yo envío
          'Content-type': 'application/json',
          //Describe el formato de lo que yo recibo (la respuesta de Github)
          Accept: 'application/json',
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: process.env.GITHUB_REDIRECT_URI,
        }),
      },
    );

    // Si la API respondió con error (404, 500, etc.), detenemos el flujo
    if (!response.ok) {
      throw new Error(`Error al obtener el token (${response.status})`);
    }

    //convierte el cuerpo en un objeto
    const data = await response.json();

    // GitHub responde 200 aunque el code falle: el error viene en el cuerpo
    if (data.error || !data.access_token) {
      throw new BadRequestException('El code no es válido o no se encuentra');
    }

    console.log(data);
    return data;
  }
}
