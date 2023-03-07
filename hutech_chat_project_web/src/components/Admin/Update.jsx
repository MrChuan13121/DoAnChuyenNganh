import React from 'react'
import '../../styles/Admin/Update.css'

function Update({ setUpModal }) {
  return (
    <div className="modalBackground-up">
      <div className="modalContainer-up">
        <div className="titleCloseBtn-up">
          <button
            onClick={() => {
              setUpModal(false)
            }}
          >
            X
          </button>
        </div>
        <div className="body">Bạn đã cập nhật dữ liệu thành công!</div>
        <div className="footer">
          <button
            onClick={() => {
              setUpModal(false)
            }}
            id="cancelBtn-up"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  )
}

export default Update
