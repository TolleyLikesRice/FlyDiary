import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'dev.tolley.flydiary',
  appName: 'FlyDiary',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;
