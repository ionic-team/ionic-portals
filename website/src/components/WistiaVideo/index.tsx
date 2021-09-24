import React, { useEffect } from 'react';

interface Props {
  videoId: string;
}

function WistiaVideo(props: Props): JSX.Element {
  useEffect(() => {
    const wistiaScript = document.createElement('script');
    wistiaScript.id = 'wistia_script';
    wistiaScript.type = 'text/javascript';
    wistiaScript.src = 'https://fast.wistia.com/assets/external/E-v1.js';
    wistiaScript.async = true;
    document.body.appendChild(wistiaScript);

    return () => {
      document.body.removeChild(wistiaScript);
    };
  }, []);

  return (
    <div className={`wistia_embed wistia_async_${props.videoId} videoFoam=true`}>
      &nbsp;
    </div>
  );
}

export default WistiaVideo;
