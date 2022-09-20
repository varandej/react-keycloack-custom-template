import Keycloak from 'keycloak-js';

class CustomKeykloak {
  // инкапсулируем основной инстанс
  private keykloak = {};

  // флаг инициализации
  public isInitialized = false;

  public init = (): Keycloak.KeycloakPromise<boolean, Keycloak.KeycloakError> => {
    this.keykloak = new Keycloak({
      realm: 'react',
      url: 'http://localhost:8080/auth',
      clientId: 'react',
    });

    // выставляем флаг инициализации по окончании таковой
    this.isInitialized = true;

    return this.keycloakGetter.init({ onLoad: 'check-sso' });
  };

  // добавляем нужные геттеры
  get token(): string | undefined { return this.keycloakGetter.token; }
  get authenticated(): boolean | undefined { return this.keycloakGetter.authenticated; }
  get keycloakGetter(): Keycloak {
    if (!Object.keys(this.keykloak).length) { throw new Error('not initialized'); }
    
    return this.keykloak as Keycloak;
  }

  // и методы
  logout = (options?: Keycloak.KeycloakLoginOptions): Keycloak.KeycloakPromise<
    void, void
  > => this.keycloakGetter.logout(options);
  login = (): Keycloak.KeycloakPromise<void, void> => this.keycloakGetter.login();
  updateToken = (): Keycloak.KeycloakPromise<boolean, boolean> => this.keycloakGetter.updateToken(1);
}

export const CustomKeycloack = new CustomKeykloak();

export const UPDATE_INTERVAL = 60;
