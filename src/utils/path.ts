// Regex to split a windows path into three parts: [*, device, slash,
// tail] windows-only
let splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/

function win32StatPath(path: string) {
  let result = splitDeviceRe.exec(path)
  let device: string = result ? result[1] : ''
  let isUnc = !!device && device[1] !== ':'
  return {
    device: device,
    isUnc: isUnc,
    isAbsolute: isUnc || !(result ? !result[2] : false), // UNC paths are always absolute
    tail: result ? result[3] : ''
  }
}

// resolves . and .. elements in a path array with directory names there
// must be no slashes or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts: string[], allowAboveRoot: boolean) {
  let res = []
  for (let i = 0; i < parts.length; i++) {
    let p = parts[i]

    // ignore empty parts
    if (!p || p === '.') continue

    if (p === '..') {
      if (res.length && res[res.length - 1] !== '..') {
        res.pop()
      } else if (allowAboveRoot) {
        res.push('..')
      }
    } else {
      res.push(p)
    }
  }

  return res
}

function normalizeUNCRoot(device: string) {
  return '\\\\' + device.replace(/^[\\\/]+/, '').replace(/[\\\/]+/g, '\\')
}

const multiPath = {
  win32: {
    join(paths: string[]): string {
      let joined = paths.join('\\')

      // Make sure that the joined path doesn't start with two slashes, because
      // normalize() will mistake it for an UNC path then.
      //
      // This step is skipped when it is very clear that the user actually
      // intended to point at an UNC path. This is assumed when the first
      // non-empty string arguments starts with exactly two slashes followed by
      // at least one more non-slash character.
      //
      // Note that for normalize() to treat a path as an UNC path it needs to
      // have at least 2 components, so we don't filter for that here.
      // This means that the user can use join to construct UNC paths from
      // a server name and a share name; for example:
      //   path.join('//server', 'share') -> '\\\\server\\share\')
      if (!/^[\\\/]{2}[^\\\/]/.test(paths[0])) {
        joined = joined.replace(/^[\\\/]{2,}/, '\\')
      }

      return this.normalize(joined)
    },
    normalize(path: string): string {
      let result = win32StatPath(path),
        device = result.device,
        isUnc = result.isUnc,
        isAbsolute = result.isAbsolute,
        tail = result.tail,
        trailingSlash = /[\\\/]$/.test(tail)

      let tmp = tail.replace(/[\\\/]+/, '?')

      // Normalize the tail path
      tail = normalizeArray(tmp.split('?'), !isAbsolute).join('\\')

      if (!tail && !isAbsolute) {
        tail = '.'
      }
      if (tail && trailingSlash) {
        tail += '\\'
      }

      // Convert slashes to backslashes when `device` points to an UNC root.
      // Also squash multiple slashes into a single one where appropriate.
      if (isUnc) {
        device = normalizeUNCRoot(device)
      }

      return device + (isAbsolute ? '\\' : '') + tail
    }
  },
  posix: {
    join(paths: string[]): string {
      let path = ''
      for (let i = 0; i < paths.length; i++) {
        let segment: string = paths[i]
        if (segment) {
          if (!path) {
            path += segment
          } else {
            path += '/' + segment
          }
        }
      }
      return this.normalize(path)
    },
    normalize(path: string): string {
      let isAbsolute = path.charAt(0) === '/',
        trailingSlash = path && path[path.length - 1] === '/'

      // Normalize the path
      path = normalizeArray(path.split('/'), !isAbsolute).join('/')

      if (!path && !isAbsolute) {
        path = '.'
      }
      if (path && trailingSlash) {
        path += '/'
      }

      return (isAbsolute ? '/' : '') + path
    }
  }
}

export const path = {
  join(...paths: string[]): string {
    if (File.fs === 'Windows') {
      return multiPath.win32.join(paths)
    } else return multiPath.posix.join(paths)
  },
  normalize(pathString: string): string {
    if (File.fs === 'Windows') {
      return multiPath.win32.normalize(pathString)
    } else return multiPath.posix.normalize(pathString)
  }
}
