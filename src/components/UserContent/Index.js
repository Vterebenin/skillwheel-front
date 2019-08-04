import { Card } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from '../Loader/Index'
import imgLvl1 from './files/lvl1.jpg'
import imgLvl2 from './files/lvl2.jpg'
import imgLvl3 from './files/lvl3.jpg'
import {
    fetchUserIfNeeded
} from '../../actions'
const { Meta } = Card;

class UserContent extends Component {
    constructor(props) {
        super(props)
        const { dispatch } = this.props
        dispatch(fetchUserIfNeeded())
    }

    componentDidUpdate(prevProps, prevState) {
        
        if (this.props.user !== prevProps.user) {
            const { dispatch } = this.props
            dispatch(fetchUserIfNeeded())
        }
    }

    render() {
        let img;
        const { user } = this.props
        if (user) {
            const { grade } = user
            switch (grade.toLowerCase()) {
                case "ученик":
                    img = imgLvl2
                    break;
                case "мастер":
                    img = imgLvl3
                    break;
                default:
                    img = imgLvl1
                    break;
            }
            const Desc = () => {
                const { name, grade, date_of_employment } = user

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
                    <Meta description={<Desc />} />
                </Card>
            )
        }

        return <Loader />
    }
}

function mapStateToProps(state) {
    const { user } = state.selectedUser
    return {
        user,
    }
}

export default connect(mapStateToProps)(UserContent) 