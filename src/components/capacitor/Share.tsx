import React, { useCallback, FC } from 'react'
import { Plugins, ShareOptions  } from '@capacitor/core';
import { Button } from 'reactstrap';


export const SharePost: FC<{content: ShareOptions}> = ({content}) => {
    const { Share } = Plugins;
    
    const share = useCallback(() => {
        Share.share(content);
    }, [content])
    return (
        <Button onClick={share}>Share</Button>
    )
}
