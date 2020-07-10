// Inspired from https://github.com/sindresorhus/active-win/blob/master/lib/windows.js
/* eslint-disable new-cap */
const ffi = require('ffi-napi')
const ref = require('ref-napi')
const { U } = require ('win32-api')
const { DTypes } = require ('win32-def')
//import { DModel as M, DTypes as W, FModel as FM } from 'win32-def'

const os = require("os")

function getNativeWindowHandle_Int(win) {
    let hbuf = win.getNativeWindowHandle()

    if (os.endianness() == "LE") {
        return hbuf.readInt32LE()
    }
    else {
        return hbuf.readInt32BE()
    }
}

const knl32 = ffi.Library('kernel32.dll', {
  GetLastError: ['uint32', []],
  FormatMessageW: [
    'uint',
    ['uint', 'pointer', 'uint', 'uint', 'pointer', 'uint', 'pointer'],
  ],
})


// Create FFI declarations for the C++ library and functions needed (User32.dll), using their "Unicode" (UTF-16) version
// const kwUser32 = new ffi.Library('User32.dll', {
//   // https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-setparent
//   SetParent: [DTypes.HWND, [DTypes.HWND, DTypes.HWND]]
// })
const kwUser32 = new ffi.Library('User32.dll', {
  // https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-setparent
  SetParent: [DTypes.HWND, [DTypes.HWND, DTypes.HWND]]
})


exports.setParent = function (window) {
  const user32 = U.load()  // load all apis defined in lib/{dll}/api from user32.dll
  const lpszWindow = Buffer.from('Calculator\0', 'ucs2')
  const hWnd = user32.FindWindowExW(0, 0, null, lpszWindow)
  const found = user32.BringWindowToTop(getNativeWindowHandle_Int(window))
  console.log('found', found)
  if (typeof hWnd === 'number' && hWnd > 0
    || typeof hWnd === 'bigint' && hWnd > 0
    || typeof hWnd === 'string' && hWnd.length > 0
  ) {
    console.log('buf: ', hWnd)

    // // Change title of the Calculator
    // //const res = user32.SetWindowTextW(hWnd, Buffer.from('Node-Calculator\0', 'ucs2'))

    // if (!res) {
    //   console.log('SetWindowTextW failed')
    // }
    // else {
    //   console.log('window title changed')
    // }
  }

  console.log('parent', hWnd)

  const prevParent = kwUser32.SetParent(getNativeWindowHandle_Int(window), hWnd)
  console.log('prevParent', prevParent)


  const lpszWindow2 = Buffer.from('Untitled - Notepad\0', 'ucs2')
  const hWnd2 = user32.FindWindowExW(0, 0, null, lpszWindow2)

  const prevParent2 = kwUser32.SetParent(getNativeWindowHandle_Int(window), hWnd2)
  console.log('prevParent', prevParent2)
}
