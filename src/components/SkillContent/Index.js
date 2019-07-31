import React, { Component } from 'react'
import './style.css'
import { Tooltip, Progress, Card } from 'antd';

const { Meta } = Card;

export default class Index extends Component {
    render() {
        const { contentObj } = this.props;
        console.log(contentObj, "obj")
        const Desc = () => {
            return ( 
                <React.Fragment>
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
                        // hoverable
                        className="sw-skill-card"
                        style={{ textAlign: "center" }}
                        cover={(
                            <Tooltip title={contentObj.level.title}>
                                <Progress
                                    strokeColor={{
                                        '0%': '#11998e',
                                        '100%': '#38ef7d',
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
