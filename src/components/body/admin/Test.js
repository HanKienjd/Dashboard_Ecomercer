
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CKEditor from 'ckeditor4-react';

class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '<p>React is really <em>nice</em>!</p>'
    };

    this.handleChange = this.handleChange.bind(this);
    this.onEditorChange = this.onEditorChange.bind(this);
  }

  onEditorChange(evt) {
    this.setState({
      data: evt.editor.getData()
    });
  }

  handleChange(changeEvent) {
    this.setState({
      data: changeEvent.target.value
    });
  }

  render() {
    return (
      <div>
        <CKEditor
          data={this.state.data}
          onChange={this.onEditorChange} />
        <label>
          Change value:
                        <textarea defaultValue={this.state.data} onChange={this.handleChange} />
        </label>
        <EditorPreview data={this.state.data} />
      </div>
    );
  }
}

class EditorPreview extends Component {
  render() {
    return (
      <div className="editor-preview">
        <h2>Rendered content</h2>
        <div dangerouslySetInnerHTML={{ __html: this.props.data }}></div>
      </div>
    );
  }
}

EditorPreview.defaultProps = {
  data: ''
};

EditorPreview.propTypes = {
  data: PropTypes.string
};

export default Test;








































// import React, { Component } from "react";
// import CKEditor from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// class Test extends Component {
//   render() {
//     return (
//       <div className="Test m-5 p-5">
//         <CKEditor
//           editor={ClassicEditor}
//           data="<p>Hello from CKEditor 5!</p>"
//           onInit={(editor) => {
//             // You can store the "editor" and use when it is needed.
//             console.log("Editor is ready to use!", editor);
//           }}
//           onChange={(event, editor) => {
//             const data = editor.getData();
//             console.log({ event, editor, data });
//             console.log('data',data);
//           }}
//           onBlur={(event, editor) => {
//             // console.log("Blur.", editor);
//           }}
//           onFocus={(event, editor) => {
//             // console.log("Focus.", editor);
//           }}
//         />
//         <br />
//         <br />
//         <br />
//       </div>
//     );
//   }
// }

// export default Test;
