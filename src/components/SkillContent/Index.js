import React, { Component } from 'react'
import './style.css'
import { connect } from 'react-redux'
import { Tooltip, Progress, Card } from 'antd';
const { Meta } = Card;

class Index extends Component {
  
    
    render() {
        const { currentSkill, skillId } = this.props;
        const Desc = () => {
            return ( 
                <React.Fragment>
                    <h2>{currentSkill.skill.title}</h2>
                    {/* {skillId && 
                        <h3>{skillId}</h3>
                    } */}
                    <h3>Оценка: {currentSkill.level.title}</h3>
                    <h4>Какое-нибудь описание для этого скила? description сейчас "null"</h4>
                </React.Fragment>
            )
        }
        return (
            
            <React.Fragment>
                {currentSkill.skill ? (
                    <Card
                        // hoverable
                        className="sw-skill-card"
                        style={{ textAlign: "center" }}
                        cover={(
                            <Tooltip title={currentSkill.level.title}>
                                <Progress
                                    strokeColor={{
                                        '0%': '#11998e',
                                        '100%': '#38ef7d',
                                    }}
                                    percent={currentSkill.level.percent}
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
function mapStateToProps(state) {
    const { skillId, currentSkill } = state.skillOfClickedArea
    return {
        currentSkill,
        skillId,
    }
}

export default connect(mapStateToProps)(Index)