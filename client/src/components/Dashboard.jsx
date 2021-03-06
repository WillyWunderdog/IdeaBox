import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Idea from './common/Idea';
import SideNav from './common/SideNav';
import { fetchAllPublicIdeas } from '../actions/ideaActions'

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ideas: this.props.ideas,
    };
  }

  componentDidMount() {
    this.props.fetchAllPublicIdeas();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ideas: nextProps.ideas,
    });
  }

  render() {
    const { ideas } = this.state;
    return (
      <div >
        <div className="row">
          <div className="col l4 xl3">
            <SideNav className="black white-text" />
          </div>
          <div className="col l8 xl9 ideaDashboard">
            <h5>Public Ideas</h5>
            <div id="card-container" className="row">
              {ideas &&
                ideas.map(idea => (
                  <Idea
                    key={idea._id}
                    id={idea._id}
                    title={idea.title}
                    category={idea.category}
                    description={idea.description}
                    status={idea.status}
                    dueby={idea.dueBy}
                    author={idea.author}
                    modified={idea.modified}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  fetchAllPublicIdeas: PropTypes.func.isRequired,
  ideas: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = state => ({
  ideas: state.ideaReducer
});

export default connect(mapStateToProps, { fetchAllPublicIdeas })(Dashboard);