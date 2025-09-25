import { StyleSheet, Dimensions, Platform } from 'react-native';
import { hp, wp } from '../utils/dimensions';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: { flex: 1, padding: wp(3) },
  header: { padding: wp(3), borderRadius: wp(3), marginBottom: hp(1.5) },
  title: { fontSize: wp(5.5), fontWeight: '700' },
  searchBox: {
    flexDirection: 'row',
    padding: wp(2.5),
    borderRadius: wp(3),
    alignItems: 'center',
    marginBottom: hp(1.2),
  },
  input: {
    flex: 1,
    fontSize: wp(4),
    padding: Platform.OS === 'ios' ? hp(1.2) : hp(0.8),
  },
  searchBtn: {
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(3),
    borderRadius: wp(2),
    marginLeft: wp(2),
  },
  btnText: { color: '#fff', fontWeight: '600', fontSize: wp(4) },
  mainRow: { flex: 1, flexDirection: width > 700 ? 'row' : 'column' },
  leftPane: {
    flex: 0.45,
    padding: wp(3),
    borderRadius: wp(3),
    marginRight: width > 700 ? wp(2) : 0,
    marginBottom: width > 700 ? 0 : hp(1.5),
    marginTop: wp(2),
  },
  rightPane: { flex: 0.55, padding: wp(3), borderRadius: wp(3) },
  sectionTitle: { fontSize: wp(4), fontWeight: '700', marginBottom: hp(0.5) },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1),
    borderBottomWidth: 0.4,
    borderColor: '#ccc',
  },
});
