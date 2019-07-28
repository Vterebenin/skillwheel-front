import { Card } from 'antd'
import React, { Component } from 'react'
import { userData } from '../mocks/realdata';
const { Meta } = Card;

export default class UserContent extends Component {
    constructor(props) {
        super(props)
        this.Data = userData;
        console.log("Data", this.Data)
    }
    
    
    render() {

        const Desc = () => {
            const { name, grade, date_of_employment } = this.Data
            return ( 
                <React.Fragment>
                    <h1>Хэй, {name}</h1> 
                    <h2>Да ты у нас: {grade}</h2>
                    <h3>Работяга аж с {date_of_employment}</h3>
                </React.Fragment>
            )
        }

        return (
            <Card
                hoverable
                style={{ width: "100%" }}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
                <Meta description={<Desc />} />
            </Card>
        )
    }
}
