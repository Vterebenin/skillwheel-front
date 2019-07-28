import React, { Component } from 'react'
import { Tooltip, Progress, Card } from 'antd';
import { userData } from "../mocks/realdata";

const { Meta } = Card;

export default class Index extends Component {
    render() {
        const currentSkill = userData.areas[1].skills[1]

        // console.log(userData.areas[1].skills[1], "from skillContent")
        return (
            <div>
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
                    <Meta title={currentSkill.level.percent} description={<h4>Какое-нибудь описание для этого скила? description сейчас "null"</h4>} />
                </Card>


            </div>
        )
    }
}
