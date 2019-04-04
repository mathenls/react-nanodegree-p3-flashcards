import React from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'

const Container = styled.View`
    position: absolute;
    flex: 1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background-color: #0008;
    justify-content: center;
    align-items: center;
`

export const LoadingModal = (props) => {
    return props.visible ? (
        <Container {...props}>
            <ActivityIndicator size="large" color="red"/>
        </Container>
    ) : null
}

LoadingModal.defaultProps = {
    visible: true
}
