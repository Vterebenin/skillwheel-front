import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
	fetcharea,
} from '../actions'

class AsyncApp extends Component {

	componentDidMount() {
		const { dispatch } = this.props
		console.log(this.props);
		dispatch(fetcharea('reactjs')).then((data) => console.log(data, "hello"))
		// dispatch(fetchPostsIfNeeded(selectedSubreddit))
	}

	componentDidUpdate(prevProps) {
		if (this.props.selectedUser !== prevProps.selectedUser) {
			const { dispatch } = this.props
			dispatch(fetcharea('reactjs')).then((data) => console.log(data, "hello"))

			//   dispatch(fetchPostsIfNeeded(selectedSubreddit))
		}
	}


	render() {
		console.log(this.props)
		const { lastUpdated, user } = this.props
		console.log(user, "areas..")
		return `${user} ${new Date(lastUpdated).toLocaleTimeString()}`
		// return (
		//   <div>
		//     
		//     <p>
		//       {lastUpdated && (
		//         <span>
		//           Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{' '}
		//         </span>
		//       )}
		//       {!isFetching && (
		//         <button onClick={this.handleRefreshClick}>Refresh</button>
		//       )}
		//     </p>
		//     {isFetching && posts.length === 0 && <h2>Loading...</h2>}
		//     {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
		//     {posts.length > 0 && (
		//       <div style={{ opacity: isFetching ? 0.5 : 1 }}>
		//         <Posts posts={posts} />
		//       </div>
		//     )}
		//   </div>
		// )
	}
}

function mapStateToProps(state) {
	const { areasByUser } = state
	const { lastUpdated, user } = areasByUser
	return {
		lastUpdated,
		user
	}
}

export default connect(mapStateToProps)(AsyncApp)