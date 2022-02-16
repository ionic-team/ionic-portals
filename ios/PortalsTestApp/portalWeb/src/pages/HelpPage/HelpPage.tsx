import React from 'react';
import { IonContent, IonIcon, IonItem, IonPage } from '@ionic/react';
import { callOutline, mailOutline } from 'ionicons/icons';
import FadeIn from '../../components/FadeIn';

import './HelpPage.scss';

const HelpPage = () => {
  return (
    <IonPage id="help-page">
      <FadeIn isLoaded={true}>
        <IonContent>
          <IonItem lines="none">
            <h1>Get Assistance</h1>
          </IonItem>
          <IonItem lines="none">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </IonItem>
          <IonItem lines="none">
            <a className="help-link" href="mailto:help@portals.ionic.io">
              <IonIcon slot="icon-only" icon={mailOutline} />
              help@portals.ionic.io
            </a>
          </IonItem>
          <IonItem lines="none">
            <a className="help-link" href="tel:1-800-767-8257">
              <IonIcon slot="icon-only" icon={callOutline} />
              1-800-PORTALS
            </a>
          </IonItem>
        </IonContent>
      </FadeIn>
    </IonPage>
  );
};

export default HelpPage;
