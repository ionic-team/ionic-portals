//@ts-ignore
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export const getCapacitorVersion = () => {
    const { siteConfig } = useDocusaurusContext();
    return siteConfig.customFields.capacitorVersion;
}

export const getPortalsVersion = () => {
    const { siteConfig } = useDocusaurusContext();
    return siteConfig.customFields.portalsVersion;
}

export const getPortalsVersionIos = () => {
    const { siteConfig } = useDocusaurusContext();
    return siteConfig.customFields.portalsVersionIos;
}

export const getPortalsVersionAndroid = () => {
    const { siteConfig } = useDocusaurusContext();
    return siteConfig.customFields.portalsVersionAndroid;
}

export const getiOSMinVersion = () => {
    const { siteConfig } = useDocusaurusContext();
    return siteConfig.customFields.iosMinVersion;
}

export const getAndroidMinSdk = () => {
    const { siteConfig } = useDocusaurusContext();
    return siteConfig.customFields.androidMinSdk;
}

