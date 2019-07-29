import { Card } from 'antd'
import React, { Component } from 'react'
import { userData } from '../mocks/realdata';
import imgPiggy from './files/piggy.jpg'
import imgNotPiggy from './files/notpiggy.jpg'
const { Meta } = Card;

export default class UserContent extends Component {
    constructor(props) {
        super(props)
        this.Data = userData;
        // console.log("Data", this.Data)
    }
    
    
    render() {
        console.log(userData, "from render");
        let img;
        const {grade} = this.Data;
        // console.log(grade);
        switch (grade.toLowerCase()) {
            case "ученик":
                img = imgPiggy        
                break;
            case "мастер":
                img = imgNotPiggy        
                break;
            default:
                img = imgPiggy        
                break;
        }

        const Desc = () => {
            const { name, grade, date_of_employment } = this.Data
            
            
            return ( 
                <React.Fragment>
                    <h2>Хэй, {name}!</h2> 
                    <h1>Да ты у нас: {grade}</h1>
                    <h3>И работяга аж с {date_of_employment}</h3>
                </React.Fragment>
            )
        }

        return (
            <Card
                hoverable
                style={{ width: "100%" }}
                
                cover={<img alt="example" src={img} />}

            >
                {/* cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />} */}
                <Meta description={<Desc />} />
            </Card>
        )
    }
}
