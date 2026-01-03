import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import Grid from './Grid';

export default class ImageGrid extends React.Component {
  static propTypes = {
    onPressImage: PropTypes.func,
  };

  static defaultProps = {
    onPressImage: () => {},
  };

  state = {
    images: [
      { uri: 'https://picsum.photos/600/600?image=10' },
      { uri: 'https://picsum.photos/600/600?image=20' },
      { uri: 'https://picsum.photos/600/600?image=30' },
      { uri: 'https://picsum.photos/600/600?image=40' },
    ],
  };

  componentDidMount() {
    this.getImages();
  }

  getImages = async () => {
    // CLI'da izinler AndroidManifest ve Info.plist üzerinden yönetilir.
    // Burada CameraRoll.getPhotos çağrılabilir ama izin hatası alabilirsin.
    // Test için statik resimler yeterlidir.
    /* CameraRoll.getPhotos({ first: 20 })
      .then(r => {
         const assets = r.edges.map(item => item.node.image);
         this.setState({ images: assets });
      })
      .catch(err => console.log(err));
    */
  };

  renderItem = ({ item: { uri }, size, marginTop, marginLeft }) => {
    const { onPressImage } = this.props;
    const style = { width: size, height: size, marginLeft, marginTop };

    return (
      <TouchableOpacity
        key={uri}
        activeOpacity={0.75}
        onPress={() => onPressImage(uri)}
        style={style}
      >
        <Image source={{ uri }} style={styles.image} />
      </TouchableOpacity>
    );
  };

  render() {
    const { images } = this.state;
    return (
      <Grid
        data={images}
        renderItem={this.renderItem}
        keyExtractor={item => item.uri}
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});
