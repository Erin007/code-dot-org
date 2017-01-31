import React, { PropTypes } from 'react';
import ToggleGroup from '../ToggleGroup';
import color from "@cdo/apps/util/color";

// TODO - can't use toggle group when we need to change both icons as we toggle?
// hacky approach might be to have two groups and hide one at a time

// TODO: I resized the summary images in gimp to be 22x23 instead of 21x23. In
// resaving, they got bigger (in file size) than the detail images. Might be
// worth rationalizing.
const summaryActive = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAXCAYAAAAP6L+eAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QEfBicvUU//cAAAAKtJREFUOMvtlLENwjAURN93kQoWoGEzNggNVPRxl4ZMAJNBkwVIExccTaJYFpLTIBq/8p/vbMlfB79Ckpc0amGU5CO9SfQcoyRvkl7AJrlvMLPtFPxNzzE4oANCNAzTbCbVcwTgSmHG7s/e662ToAIwCOasPex3F4Dbo2+QzrOeDZz8TqKOTYJKoo7OHteGxn5nRmfRrxsEs2UrUn3Ni8tWlK4oXVG64u9d8QEqLgOqdcEqDwAAAABJRU5ErkJggg==";
const summaryInactive = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAXCAYAAAAP6L+eAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QEfBjoS9kvffQAAALhJREFUOMvtlLERglAQRN/9gCJMbMYOzO0AEojIISORCjTXChxr0YQiCFgDAf9gAASOyd/s397+u5nbWfgRjMutBFIg6mstULHf5QBc7wXqMo+fQwtUDiyeiKK+9oaUrPh01DtQ3U/xJqr+PL/4+Y3NjgSMrjg/m1KdUvUHMmjNWXXYbnKA06MpkDItPOCgdxKxLxJEErHXm2iFKwa9M6M27+oGrRmjK6b8ko2B4IqQFSErQlb8NyteNvx30d8zRqcAAAAASUVORK5CYII=";
const detailActive = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAXCAYAAAAP6L+eAAAAWklEQVR4AWP4//9/GxD//E8lADWrDWTw5//UB59p52I4GAULHzxrXXj/6c8F95/+pwYGmQUykwHZUGoazgBi0AKPGjxqMCamXTpe9PBZG01yHgyMgtE6D+5iAJNEO6l4m/U/AAAAAElFTkSuQmCC";
const detailInactive = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAXCAYAAAAP6L+eAAAAXklEQVR4AWNgWLunDYh/AvF/amCoWW1Ag/d+BglQE4PMpJ2L4WAULHzwrHXh/ac/F9x/+p8aGGQWyEwGZEOpaTgDiEELPGrwqMGYmHbpeNHDZ200yXkwMApG6zy4iwHRcmtODj8COgAAAABJRU5ErkJggg==";

const styles = {
  icon: {
    fontSize: 20,
    paddingLeft: 3,
    paddingRight: 3,
    paddingTop: 6,
    paddingBottom: 3,
    // If not set explicitly, css sets "button > img" to 0.6
    opacity: 1
  }
};

const ProgressDetailToggle = React.createClass({
  propTypes: {
    isSummary: PropTypes.bool.isRequired
  },

  // TODO - eventually this will be in redux
  getInitialState() {
    return {
      isSummary: this.props.isSummary
    };
  },

  onChange() {
    this.setState({
      isSummary: !this.state.isSummary
    });
  },

  render() {
    const { isSummary } = this.state;
    return (
      <ToggleGroup
        selected={isSummary ? "summary" : "detail"}
        activeColor={color.cyan}
        onChange={this.onChange}
      >
        <button value="summary">
          <img
            src={isSummary ? summaryActive : summaryInactive}
            style={styles.icon}
          />
        </button>
        <button value="detail">
          <img
            src={isSummary ? detailInactive : detailActive}
            style={styles.icon}
          />
        </button>
      </ToggleGroup>
    );

  }
});

export default ProgressDetailToggle;
