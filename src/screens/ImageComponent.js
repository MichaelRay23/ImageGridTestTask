import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchImages} from '../redux/actions/imagesAction';
import {imageSelector} from '../redux/reducers/imageReducer';
import styles from './Styles';
import FastImage from 'react-native-fast-image';
import NetStatus from '../utils/NetStatus';

const ImageItem = ({image, width, height}) => {
  return (
    <FastImage
      style={[styles.card, {height, width}]}
      source={{
        uri: image,
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
};

const ImageComponent = () => {
  const dispatch = useDispatch();

  const getImages = useSelector(imageSelector);
  const [nextPage, setNextPage] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [firstNumber, setFirstNumber] = useState(10);

  useEffect(() => {
    apiCall();
  }, []);

  const apiCall = async () => {
    let url =
      'https://us1.prisma.sh/mrugrajsinh-vansadia-797f28/ReactNativeTask/dev/';

    try {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      var raw = JSON.stringify({
        query: `query{\n  imagePostsConnection(orderBy:name_ASC,first:${firstNumber},skip:${pageNumber}){\n    aggregate{\n      count\n    }\n    edges{\n      node{\n        image\n        name\n      }\n    }\n    pageInfo{\n      hasNextPage\n    }\n  }\n}`,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      await fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => {
          const data1 = JSON.parse(result);
          dispatch(fetchImages(data1.data?.imagePostsConnection.edges));
          setNextPage(data1.data?.imagePostsConnection?.pageInfo?.hasNextPage);
        })
        .catch(error => console.log('error', error));
    } catch (err) {
      console.log('Error: ', err.message);
    }
  };

  const endReached = () => {
    if (nextPage === true) {
      var skipNumber = pageNumber + 10;
      setPageNumber(skipNumber);
      var firstNum = firstNumber + 10;
      setFirstNumber(firstNum);
      apiCall();
    }
  };
  const renderCard = ({item}) => {
    const dataLength = (item?.node?.image).length;

    const odd = dataLength % 2 === 1;
    let tempData = [];
    if (odd) {
      tempData = item?.node?.image?.filter((element, index) => {
        return index != 0;
      });
    } else {
      tempData = item?.node?.image;
    }

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.text}>{item?.node?.name}</Text>
        {odd && (
          <ImageItem
            image={item?.node?.image?.[0]}
            width={'100%'}
            height={250}
          />
        )}
        <View style={styles.tempDataStyle}>
          {tempData.map(item => {
            return (
              <View key={Math.random()}>
                <ImageItem image={item} width={180} height={180} />
              </View>
            );
          })}
        </View>
      </View>
    );

    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      <NetStatus />

      <FlatList
        style={styles.flatList}
        keyExtractor={(item, index) => String(index)}
        data={getImages}
        renderItem={renderCard}
        onEndReached={endReached}
        onEndReachedThreshold={0.2}
      />
    </SafeAreaView>
  );
};
export default ImageComponent;
