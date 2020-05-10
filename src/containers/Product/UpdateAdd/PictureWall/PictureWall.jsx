import React,{Component} from 'react'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { reqDeleteProduct } from '@/api'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = async({ file,fileList }) => {
    //file是fileList最后一个文件
    // console.log(file.response,fileList)
    if( file.status === 'done'){
       const {data,status} = file.response
       const {name,url}  = data
       if(status===0){
        fileList[fileList.length -1].name = name //得到服务器端的图片名称和地址
        fileList[fileList.length -1].url = url //得到服务器端的图片名称和地址
       }
    }else if(file.status === 'removed'){
       //删除图片请求 file只能读不能写
       const result = await reqDeleteProduct(file.name)
      // 获取请求结果的属性
       const { msg,status } = result
       if(status === 0) message.success('删除商品图片成功')//  删除成功
       else message.error(msg) //  删除失败
    }
    // console.log(file,fileList)
    this.setState({ fileList })
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/api/manage/img/upload" //上传地址
          name="image"//上传携带的参数
          listType="picture-card"//作为照片墙
          fileList={fileList} //文件列表
          onPreview={this.handlePreview} //图片预览的回调
          onChange={this.handleChange} //图片状态改变的回调
        >
          {/* 图片展示的张数 */}
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}