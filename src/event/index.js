import { connect } from "react-redux"
import Component from './view';

const mapStateToProps = (store) => ({ event: store.event.event });
const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Component)