import React from 'react';
import { CustomKeycloack, UPDATE_INTERVAL } from './custom-keykloak-provider-config';

type TProps = { children: React.ReactElement };

/**
 * Компонент кастомного ХОКа работы с кейклоком
 */
export const CustomKeycloakProvider: React.FC<TProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | undefined>();

  React.useEffect(
    () => {
      CustomKeycloack.init()
        .then(setIsAuthenticated);
    },
    [],
  );

  React.useEffect(
    () => {
      if (isAuthenticated) {
        // устанавливаем автоапдейт токена
        setInterval(
          () => CustomKeycloack.updateToken()
            .catch(console.log),
          UPDATE_INTERVAL,
        );
      }
    },
    [isAuthenticated],
  );

  const onLogInBtnClick = () => {
    CustomKeycloack.login();
  };

  if (!CustomKeycloack.isInitialized) { return <strong>Погоди-ка</strong> }

  return isAuthenticated
    ? children
    : (
      <div>
        <strong>Unautorized</strong>
        <br/>
        <button onClick={onLogInBtnClick}>
          Log in
        </button>
      </div>
    );
};
