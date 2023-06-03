//Import TestBed para Testing de la Aplicacion
import { TestBed } from '@angular/core/testing';

//Import JwtInterceptor para que el frontend pueda obtener la informacion del backend
import { JwtInterceptor } from './jwt-interceptor';

//Describe del JwtInterceptor para que el frontend pueda obtener la informacion del backend
describe('JwtInterceptorInterceptor', () => {
  
  //BeforeEach es para que el test se ejecute despues del describe
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      JwtInterceptor
      ]
  }));

  //Validacion de que se creo el JWT para el usuario, funcion expect(interceptor).toBeTruthy valida que el token sea verdadero
  it('should be created', () => {
    const interceptor: JwtInterceptor = TestBed.inject(JwtInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
