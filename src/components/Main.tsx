import * as React from 'react'
import { Plugins } from '@capacitor/core';

type Props = {
    children: React.ReactChild | React.ReactChild[],
    className?: string,
    style?: React.CSSProperties
}

export default ({children, className, style}: Props) => {
    const rowStyle = {
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
        ...style,
    }
    const { Device } = Plugins;
    const [info, updateInfo] = React.useState<{[key: string]: string}>({})
    React.useEffect(() => {
        const contents: {[key: string]: string} = {}
        Device.getInfo()
        .then(info => {
            contents['platform'] = info.platform
            return Device.getBatteryInfo()
        }).then(info => {
            contents['batteryLevel'] = info.batteryLevel * 100 + '%'
            return Device.getLanguageCode()
        }).then(info => {
            contents['Language'] = info.value
            return
        }).catch(e => {
            console.log(e)
        }).then(() => {
            updateInfo(contents)
        })
    }, [updateInfo])
    return (
        <div style={rowStyle} className={className}>
            {children}
            <dl>
                <dt>Device data</dt>
                <dd><ul>{Object.entries(info).map(([key, value]) => {
                    return <li key={key}>{key}: {value}</li>
                })}</ul></dd>
            </dl>
        </div>
    )
}