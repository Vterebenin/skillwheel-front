import React, { Component } from 'react'
import { Tooltip, Progress, Card } from 'antd';
import { userData } from "../mocks/realdata";

const { Meta } = Card;

export default class Index extends Component {
    render() {
        const currentSkill = userData.areas[1].skills[1]
        
        const Desc = () => {
            
            return ( 
                <React.Fragment>
                    <h2>{currentSkill.skill.title}</h2>
                    <h3>Оценка: {currentSkill.level.title}</h3>
                    <h4>Какое-нибудь описание для этого скила? description сейчас "null"</h4>
                </React.Fragment>
            )
        }
        return (
            <React.Fragment>
                <Card
                    hoverable
                    style={{ textAlign: "center" }}
                    cover={(
                        <Tooltip title={currentSkill.level.title}>
                            <Progress
                                strokeColor={{
                                    '0%': '#B22222',
                                    '100%': '#32CD32',
                                }}
                                percent={currentSkill.level.percent}
                                type="circle"

                            />
                        </Tooltip>

                    )}
                >
                    <Meta description={<Desc />} />
                </Card>
            </React.Fragment>
        )
    }
}
