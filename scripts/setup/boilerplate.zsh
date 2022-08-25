die_on_error () {
    set -e
}

show_commands () {
    set -x
}

# Usage:
#   confirm && echo "Confirmed!"
#   confirm "Would your really like to?" && echo "Ok!"
confirm() {
    read -q "RESPONSE?${1:-Are you sure?} [y/N] "
    case "${RESPONSE}" in
        [yY][eE][sS]|[yY])
            true
            ;;
        *)
            false
            ;;
    esac
}

# boilerplate_init is called at the top of every bash script:
#
#   #!/bin/bash # Boilerplate: go to root, include boilerplate script & return to script dir
#   WD=`pwd` && cd "$(git rev-parse --show-toplevel)" && . scripts/setup/boilerplate.zsh
#
# It creates a SCRIPT_DIR variable, which can be used directly or by calling cd_to_script_dir
boilerplate_init () {
    cd $WD # part of boilerplate snippet:
    SCRIPT_SOURCE=$0
    export SCRIPT_DIR="$( cd "$( dirname "${SCRIPT_SOURCE}" )" >/dev/null 2>&1 && pwd )"
}

die_on_error
boilerplate_init

go_to_root () {
    cd $ROOT
}

export ROOT=`git rev-parse --show-toplevel`
