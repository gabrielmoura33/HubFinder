/* eslint-disable react/static-property-placement */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';
import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  Loading,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    page: 1,
    stars: [],
    loading: true,
    refreshing: false,
  };

  async componentDidMount() {
    this.load();
  }

  load = async (page = 1) => {
    const { navigation } = this.props;
    const { stars } = this.state;
    const user = navigation.getParam('user');
    const response = await api.get(`/users/${user.login}/starred`, {
      params: { page },
    });
    this.setState({
      stars: page >= 2 ? [...stars, ...response.data] : response.data,
      page,
      loading: false,
    });
  };

  loadMore = () => {
    const { page } = this.state;
    const nextPage = page + 1;
    this.load(nextPage);
  };

  refreshList = () => {
    this.load(1);
  };

  handleNavigate = webview => {
    const { navigation } = this.props;

    navigation.navigate('WebView', { webview });
  };

  render() {
    const { navigation } = this.props;
    const { stars, loading, refreshing } = this.state;

    const user = navigation.getParam('user');
    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          <Loading />
        ) : (
          <Stars
            data={stars}
            keyExtractor={star => String(star.id)}
            onRefresh={this.refreshList}
            refreshing={refreshing}
            renderItem={({ item }) => (
              <Starred onPress={() => this.handleNavigate(item)}>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
          />
        )}
      </Container>
    );
  }
}
