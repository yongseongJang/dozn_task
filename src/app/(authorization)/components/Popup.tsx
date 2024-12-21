'use client'

import { Box, Modal, Typography } from '@mui/material'

interface PopupProps {
    output: string,
    onClickBtn: () => void
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function Popup({ output, onClickBtn } : PopupProps) {
    return (
      <Modal
        open={true}
        onClose={onClickBtn}
      >
        <Box sx={style}>
          <Typography sx={{ mt: 2, wordBreak: 'break-all' }}>
            {output && JSON.stringify(output)}
          </Typography>
        </Box>
      </Modal>
    )
}
