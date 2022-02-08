import React from 'react';
import { IonButton, IonContent, IonPage } from '@ionic/react';

const DevPage: React.FC = () => (
  <IonPage>
    <IonContent>
      <IonButton expand="block" href="/help">
        Help Portal
      </IonButton>
    </IonContent>
  </IonPage>
);

export default DevPage;
