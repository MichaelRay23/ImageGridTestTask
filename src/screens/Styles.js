import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  flatList: {
    flex: 1,
  },
  itemContainer: {
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  card: {
    resizeMode: 'cover',
    margin: 2,
  },
  tempDataStyle: {
    flexDirection: 'row',
    alignSelf: 'center',
    flexWrap: 'wrap',
    flex: 1,
  },
});
export default styles;
