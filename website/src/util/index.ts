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
