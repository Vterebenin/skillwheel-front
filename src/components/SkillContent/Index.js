import React, { Component } from 'react'
import { Tooltip, Progress, Card } from 'antd';

const { Meta } = Card;

export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contentObj: this.props.contentObj
        }
    }
    
    render() {
        const { contentObj } = this.state;
        console.log(contentObj)
        const Desc = () => {
            return ( 
                <React.Fragment>
                    <h2>{contentObj.skill.title}</h2>
                    
                    <h2>{contentObj.skill.title}</h2>
                    
                    <h3>Оценка: {contentObj.level.title}</h3>
                    <h4>Какое-нибудь описание для этого скила? description сейчас "null"</h4>
                </React.Fragment>
            )
        }
        return (
            
            <React.Fragment>
                {contentObj.skill ? (
                    <Card
                        hoverable
                        style={{ textAlign: "center" }}
                        cover={(
                            <Tooltip title={contentObj.level.title}>
                                <Progress
                                    strokeColor={{
                                        '0%': '#B22222',
                                        '100%': '#32CD32',
                                    }}
                                    percent={contentObj.level.percent}
                                    type="circle"

                                />
                            </Tooltip>

                        )}
                    >
                        <Meta description={<Desc />} />
                    </Card>
                ) : ('') }
                
            </React.Fragment>
        )
    }
}
