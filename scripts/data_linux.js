// scripts/data_linux.js
// 20 MCQs per unit for Linux Administration (Units 1 to 6)

module.exports = {
  "linux-u1": [
    {
      q: "According to the Linux Filesystem Hierarchy Standard (FHS), which directory holds machine-local configuration files?",
      options: ["/bin", "/etc", "/var", "/usr"],
      answer: 1,
      explanation: "/etc contains host-specific system-wide configuration files (e.g. /etc/fstab, /etc/passwd).",
      difficulty: "Beginner"
    },
    {
      q: "What is the key difference between a Hard Link and a Soft (Symbolic) Link in Linux?",
      options: ["Hard links point directly to the inode of the file data and share the same inode number; soft links point to the file path by name", "Soft links cannot be deleted", "Hard links work across different filesystems", "Soft links take more RAM"],
      answer: 0,
      explanation: "Hard links share the same underlying inode number on the filesystem; soft links store a path pointer to another file.",
      difficulty: "Intermediate"
    },
    {
      q: "Which command lists all files including hidden files (files beginning with a dot '.') with detailed permissions and sizes?",
      options: ["ls -l", "ls -a", "ls -la (or ls -al)", "dir -all"],
      answer: 2,
      explanation: "Combining -a (all including hidden) and -l (long listing with permissions and timestamps) displays full file metadata.",
      difficulty: "Beginner"
    },
    {
      q: "What happens to the target data when the original file of a Symbolic Link is deleted?",
      options: ["The data is retained in the link", "The symbolic link becomes a broken (dangling) link pointing to a non-existent target", "The link is deleted automatically", "The kernel restores the file"],
      answer: 1,
      explanation: "Because soft links reference files by name/path, deleting the target breaks the pointer.",
      difficulty: "Intermediate"
    },
    {
      q: "Which command displays the last 15 lines of a system log file and continuously monitors it for newly appended lines in real time?",
      options: ["tail -n 15 -f /var/log/syslog", "head -15 /var/log/syslog", "cat /var/log/syslog", "less /var/log/syslog"],
      answer: 0,
      explanation: "tail -n 15 -f outputs the trailing 15 lines and the -f (follow) flag streams live log appends.",
      difficulty: "Beginner"
    },
    {
      q: "Which directory contains dynamic, variable data files such as system logs, spool directories, and temporary mailboxes?",
      options: ["/var", "/tmp", "/dev", "/opt"],
      answer: 0,
      explanation: "/var is designated for variable data that changes continuously during system operation (e.g. /var/log, /var/spool).",
      difficulty: "Beginner"
    },
    {
      q: "Which Linux command searches for files in a directory hierarchy based on criteria like name, size, or modification time?",
      options: ["search", "find", "grep", "which"],
      answer: 1,
      explanation: "The find command navigates the filesystem tree to locate files matching specific flags (e.g. find / -name '*.conf').",
      difficulty: "Beginner"
    },
    {
      q: "How does the 'grep' command differ from the 'find' command?",
      options: ["find searches for file paths and names in the directory tree; grep searches for text patterns inside file contents", "grep searches files by size", "find edits files", "grep is for images only"],
      answer: 0,
      explanation: "find locates files on the filesystem; grep searches inside files for lines matching regular expressions.",
      difficulty: "Beginner"
    },
    {
      q: "What does the directory '/dev' contain in Linux?",
      options: ["Developer scripts", "Special device files representing hardware peripherals, storage disks, and virtual devices (e.g. /dev/sda, /dev/null)", "Temporary compile binaries", "C++ headers"],
      answer: 1,
      explanation: "Linux follows the 'everything is a file' philosophy; hardware devices are represented as nodes in /dev.",
      difficulty: "Beginner"
    },
    {
      q: "What is '/dev/null' commonly called in Unix/Linux?",
      options: ["The default printer", "The null device or 'black hole' that discards all data written to it and returns EOF on reads", "A hardware tester", "A backup partition"],
      answer: 1,
      explanation: "/dev/null discards unwanted output (e.g. command > /dev/null 2>&1).",
      difficulty: "Beginner"
    },
    {
      q: "What does the 'cp -r' command flag do?",
      options: ["Replaces files without asking", "Recursively copies directories and all their nested contents", "Renames files", "Removes files"],
      answer: 1,
      explanation: "The -r or -R flag instructs cp to copy directories recursively including all subdirectories and files.",
      difficulty: "Beginner"
    },
    {
      q: "Which command shows the full absolute path of the current working directory?",
      options: ["whoami", "pwd (print working directory)", "cd", "whereami"],
      answer: 1,
      explanation: "pwd prints the current working directory path to stdout.",
      difficulty: "Beginner"
    },
    {
      q: "What does the 'touch' command do if the specified file does not exist?",
      options: ["Displays an error", "Creates a new empty file with zero bytes", "Opens a text editor", "Searches the web"],
      answer: 1,
      explanation: "touch creates a new empty file if it doesn't exist, or updates access and modification timestamps if it does.",
      difficulty: "Beginner"
    },
    {
      q: "What is an Inode (index node) in a Linux filesystem?",
      options: ["A user password", "A data structure that stores all metadata about a file (permissions, size, owner, block pointers) except its filename", "The filename string", "The USB port"],
      answer: 1,
      explanation: "An inode contains all file metadata and disk block pointers; filenames are mapped to inodes inside directory files.",
      difficulty: "Intermediate"
    },
    {
      q: "Can a Hard Link point to a directory in standard Linux filesystems?",
      options: ["Yes, anytime", "No, standard Linux filesystems prohibit hard links to directories to prevent infinite circular filesystem loops", "Only if root", "Only on ext2"],
      answer: 1,
      explanation: "To prevent directory tree corruption and infinite traversal loops, hard links to directories are disallowed.",
      difficulty: "Intermediate"
    },
    {
      q: "Which directory contains virtual pseudo-files exposing real-time kernel data structures and hardware status (e.g. /proc/cpuinfo, /proc/meminfo)?",
      options: ["/proc", "/sys", "/kernel", "/boot"],
      answer: 0,
      explanation: "/proc is a virtual filesystem (procfs) generated dynamically in RAM by the kernel exposing process and system state.",
      difficulty: "Intermediate"
    },
    {
      q: "What does the 'rm -rf' command do?",
      options: ["Renames a folder", "Forcibly and recursively removes files and directories without prompting for confirmation", "Reboots the system", "Reads files"],
      answer: 1,
      explanation: "rm -r recursively traverses subdirectories and -f forces deletion without confirmation prompts.",
      difficulty: "Beginner"
    },
    {
      q: "Which command displays the first 10 lines of a text file by default?",
      options: ["top", "head", "lead", "start"],
      answer: 1,
      explanation: "head prints the first 10 lines of a file by default (customizable via -n).",
      difficulty: "Beginner"
    },
    {
      q: "What is the difference between 'less' and 'more' pagers?",
      options: ["'less' allows backward navigation as well as forward scrolling through files, whereas 'more' only allows forward scrolling", "'more' is faster", "'less' cannot view text", "'less' edits files"],
      answer: 0,
      explanation: "'less' (hence 'less is more') supports bi-directional scrolling, search navigation, and doesn't preload huge files.",
      difficulty: "Beginner"
    },
    {
      q: "Which directory holds essential boot loader files, the Linux kernel image (vmlinuz), and initial RAM disks (initrd)?",
      options: ["/root", "/boot", "/bin", "/kernel"],
      answer: 1,
      explanation: "/boot contains the GRUB configuration, Linux kernel binaries, and initramfs necessary to boot the system.",
      difficulty: "Beginner"
    }
  ],
  "linux-u2": [
    {
      q: "What does the Shebang line (#!/bin/bash) at the very top of a script specify?",
      options: ["A comment for developers", "The interpreter path used by the operating system to execute the script", "A compiler instruction", "A variable declaration"],
      answer: 1,
      explanation: "The shebang (#!) informs the kernel program loader which binary interpreter to spawn to execute the script.",
      difficulty: "Beginner"
    },
    {
      q: "Which file descriptor number corresponds to Standard Error (stderr) in Linux?",
      options: ["0 (stdin)", "1 (stdout)", "2 (stderr)", "3"],
      answer: 2,
      explanation: "Standard POSIX file descriptors are: 0 = stdin, 1 = stdout, 2 = stderr.",
      difficulty: "Beginner"
    },
    {
      q: "What does the redirection operator '>>' do compared to '>'?",
      options: ["'>' appends to a file; '>>' overwrites the file", "'>' overwrites or creates the file; '>>' appends new output to the end of the file without erasing existing contents", "They do the exact same thing", "'>>' redirects to printer"],
      answer: 1,
      explanation: "'>' truncates and overwrites destination files, whereas '>>' appends data to the end.",
      difficulty: "Beginner"
    },
    {
      q: "How do you redirect BOTH stdout and stderr to a file named 'output.log'?",
      options: ["command > output.log 2>&1 (or command &> output.log)", "command >> 2 output.log", "command 1+2> output.log", "command | output.log"],
      answer: 0,
      explanation: "command > output.log 2>&1 redirects stdout to the file, and points stderr (2) to stdout's descriptor (1).",
      difficulty: "Intermediate"
    },
    {
      q: "What special variable holds the exit status of the most recently executed command in BASH?",
      options: ["$$", "$#", "$?", "$@"],
      answer: 2,
      explanation: "$? holds the exit code of the last command (0 indicates success; non-zero indicates an error).",
      difficulty: "Beginner"
    },
    {
      q: "What does the Pipe operator (|) do in BASH?",
      options: ["Combines two files", "Directs the standard output (stdout) of the preceding command as standard input (stdin) to the succeeding command", "Runs commands in parallel", "Separates variables"],
      answer: 1,
      explanation: "Pipes create a unidirectional data flow connecting one program's stdout to the next program's stdin.",
      difficulty: "Beginner"
    },
    {
      q: "Which command reads from standard input and simultaneously writes both to standard output and to one or more files?",
      options: ["tee", "split", "pipe", "echo"],
      answer: 0,
      explanation: "The tee command splits an I/O pipeline like a T-junction, displaying output while saving to disk.",
      difficulty: "Intermediate"
    },
    {
      q: "In a BASH script, what does the special variable '$#' represent?",
      options: ["The PID of the script", "The total count of positional command-line arguments passed to the script", "All arguments as a string", "The script filename"],
      answer: 1,
      explanation: "$# expands to the number of positional parameters supplied by the caller.",
      difficulty: "Beginner"
    },
    {
      q: "In a BASH script, what does '$0' contain?",
      options: ["The first parameter passed to the script", "The filename / name of the script itself", "The exit code", "The user's home directory"],
      answer: 1,
      explanation: "$0 contains the name of the script executable as invoked from the shell.",
      difficulty: "Beginner"
    },
    {
      q: "What does the 'export' command do in BASH?",
      options: ["Sends files over FTP", "Marks an environment variable to be exported to all child subshells and spawned processes", "Encrypts variables", "Deletes variables"],
      answer: 1,
      explanation: "export ensures child processes inherit the specified environment variable.",
      difficulty: "Intermediate"
    },
    {
      q: "What syntax performs Command Substitution in modern BASH scripts?",
      options: ["$(command) or `command`", "${command}", "$command", "((command))"],
      answer: 0,
      explanation: "$(command) executes the subshell command and replaces the construct with its stdout text.",
      difficulty: "Beginner"
    },
    {
      q: "What is the difference between single quotes ('...') and double quotes (\"...\") in BASH?",
      options: ["Double quotes expand variables ($var) and command substitutions; single quotes preserve the literal string value of all characters", "Single quotes expand variables", "They are identical in BASH", "Single quotes are for numbers"],
      answer: 0,
      explanation: "Single quotes enforce strict literal string preservation; double quotes permit variable and command expansion.",
      difficulty: "Beginner"
    },
    {
      q: "What does the test expression '[ -f /path/to/file ]' evaluate?",
      options: ["Checks if the file is full", "Returns true if the path exists and is a regular file", "Returns true if directory", "Deletes the file"],
      answer: 1,
      explanation: "-f tests whether a path exists and is a regular file (as opposed to a directory or device).",
      difficulty: "Beginner"
    },
    {
      q: "What does '[ -d /path/to/dir ]' test?",
      options: ["Returns true if the target exists and is a directory", "Tests if disk is full", "Deletes directory", "Lists directory"],
      answer: 0,
      explanation: "-d evaluates to true if the file exists and is a directory.",
      difficulty: "Beginner"
    },
    {
      q: "How do you perform integer arithmetic inside a BASH script natively?",
      options: ["result=$(( 5 + 3 ))", "result=5 + 3", "calc 5 + 3", "result = [5 + 3]"],
      answer: 0,
      explanation: "$(( expression )) performs arithmetic expansion in BASH using integer math.",
      difficulty: "Beginner"
    },
    {
      q: "What is the purpose of the 'chmod +x script.sh' command?",
      options: ["Compiles the script", "Adds execute permissions to script.sh, allowing it to be run directly as a program", "Encrypts script", "Edits script"],
      answer: 1,
      explanation: "+x grants execution rights to the file.",
      difficulty: "Beginner"
    },
    {
      q: "What does the command 'source ~/.bashrc' (or '. ~/.bashrc') do?",
      options: ["Deletes the file", "Executes the script in the current active shell environment rather than spawning a subshell, applying environment updates immediately", "Opens it in nano", "Backs up the file"],
      answer: 1,
      explanation: "source executes commands in the current shell context so variable exports take effect immediately.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the purpose of the PATH environment variable in Linux?",
      options: ["Shows file sizes", "A colon-separated list of directories searched by the shell to find executable programs when a command is typed", "Stores user passwords", "Specifies network routing"],
      answer: 1,
      explanation: "When you run a command like 'ls', the shell scans directories listed in $PATH in order to locate the binary.",
      difficulty: "Beginner"
    },
    {
      q: "What does the conditional operator '&&' do between two shell commands (e.g. cmd1 && cmd2)?",
      options: ["Runs both in background", "Executes cmd2 ONLY IF cmd1 completes successfully (exit code 0)", "Runs both regardless of failure", "Pipes cmd1 into cmd2"],
      answer: 1,
      explanation: "&& provides logical short-circuiting: cmd2 executes only if cmd1 returns exit status 0 (success).",
      difficulty: "Beginner"
    },
    {
      q: "What does the conditional operator '||' do between two shell commands (e.g. cmd1 || cmd2)?",
      options: ["Runs cmd2 ONLY IF cmd1 fails (returns non-zero exit code)", "Runs both commands", "Pipes output", "Halts the system"],
      answer: 0,
      explanation: "|| executes the second command only as a fallback if the first command encounters an error.",
      difficulty: "Beginner"
    }
  ],
  "linux-u3": [
    {
      q: "What Process ID (PID) is assigned to the root ancestor systemd / init process in Linux?",
      options: ["PID 0", "PID 1", "PID 100", "PID -1"],
      answer: 1,
      explanation: "PID 1 is the first userspace process spawned by the Linux kernel, acting as the parent of all processes.",
      difficulty: "Beginner"
    },
    {
      q: "Which Linux signal forcibly and immediately terminates a process without allowing it to catch the signal or clean up resources?",
      options: ["SIGTERM (15)", "SIGINT (2)", "SIGKILL (9)", "SIGHUP (1)"],
      answer: 2,
      explanation: "SIGKILL (signal 9) cannot be caught, blocked, or ignored by the target process, terminating it immediately at kernel level.",
      difficulty: "Beginner"
    },
    {
      q: "Which signal is sent when a user presses Ctrl + C in an interactive terminal session?",
      options: ["SIGKILL (9)", "SIGINT (2)", "SIGSTOP (19)", "SIGQUIT (3)"],
      answer: 1,
      explanation: "Ctrl + C generates SIGINT (Interrupt), requesting the foreground process to terminate gracefully.",
      difficulty: "Beginner"
    },
    {
      q: "What does the signal SIGHUP (Signal 1) typically instruct system daemon services (like Nginx or Apache) to do?",
      options: ["Crash immediately", "Reload their configuration files dynamically without terminating active client connections", "Reboot the machine", "Purge all log files"],
      answer: 1,
      explanation: "Many Linux daemons intercept SIGHUP to reload altered configuration files seamlessly without a full restart.",
      difficulty: "Intermediate"
    },
    {
      q: "Which systemd command enables a service to start automatically during system boot?",
      options: ["systemctl start service_name", "systemctl enable service_name", "systemctl boot service_name", "systemctl auto service_name"],
      answer: 1,
      explanation: "systemctl enable creates symbolic links in /etc/systemd/system to register the unit for boot activation.",
      difficulty: "Beginner"
    },
    {
      q: "What is a Zombie Process (defunct) in Linux?",
      options: ["A malicious rootkit virus", "A process that has finished execution but remains in the process table because its parent has not yet read its exit status via wait()", "A background service", "A crashed kernel"],
      answer: 1,
      explanation: "Zombies have released their memory and resources, but retain their process table slot until the parent reads wait().",
      difficulty: "Intermediate"
    },
    {
      q: "What is an Orphan Process in Linux?",
      options: ["A process whose parent process terminated before it did, which is then adopted by init / systemd (PID 1)", "A process with no PID", "A process that cannot write files", "A crashed process"],
      answer: 0,
      explanation: "Orphans have their parent exit prematurely; the kernel automatically re-parents them to systemd (PID 1).",
      difficulty: "Intermediate"
    },
    {
      q: "How do you run a long-running shell command in the background immediately from the terminal?",
      options: ["Append an ampersand '&' at the end of the command (e.g. ./job.sh &)", "Prepend 'bg'", "Press Ctrl + X", "Add 'async'"],
      answer: 0,
      explanation: "Appending '&' spawns the command asynchronously in the background, immediately returning control to the shell prompt.",
      difficulty: "Beginner"
    },
    {
      q: "Which keystroke suspends an active foreground process and sends it the SIGTSTP signal?",
      options: ["Ctrl + C", "Ctrl + Z", "Ctrl + D", "Ctrl + \\"],
      answer: 1,
      explanation: "Ctrl + Z pauses the active foreground job, sending SIGTSTP and placing it in suspended background state.",
      difficulty: "Beginner"
    },
    {
      q: "How many fields are in a standard cron schedule expression in Linux crontab?",
      options: ["3 fields", "5 fields (minute, hour, day-of-month, month, day-of-week)", "6 fields", "7 fields"],
      answer: 1,
      explanation: "Standard crontab format uses 5 time/date fields: minute (0-59), hour (0-23), day (1-31), month (1-12), weekday (0-6).",
      difficulty: "Beginner"
    },
    {
      q: "What crontab schedule expression runs a backup script every day at 2:30 AM?",
      options: ["30 2 * * * /backup.sh", "2 30 * * * /backup.sh", "* 2 30 * * /backup.sh", "30 2 1 * * /backup.sh"],
      answer: 0,
      explanation: "Field order is: Minute (30) Hour (2) Day (*) Month (*) Weekday (*) -> 30 2 * * *.",
      difficulty: "Intermediate"
    },
    {
      q: "Which command queries and displays centralized systemd system and service logs?",
      options: ["syslog", "journalctl", "dmesg", "logcat"],
      answer: 1,
      explanation: "journalctl queries systemd's journald logging daemon, supporting filters by unit, time, and priority.",
      difficulty: "Beginner"
    },
    {
      q: "What does the 'top' (or 'htop') command display?",
      options: ["Disk partition sizes", "Real-time dynamic view of active system processes, CPU consumption, memory usage, and load averages", "List of installed packages", "Network cables"],
      answer: 1,
      explanation: "top and htop provide interactive monitoring of running processes and system resource utilization.",
      difficulty: "Beginner"
    },
    {
      q: "What does 'Load Average: 2.50, 1.80, 1.20' in uptime/top represent?",
      options: ["RAM usage in GB", "The average number of runnable and uninterruptible processes over the past 1, 5, and 15 minutes", "Network speed in Mbps", "Temperature of CPU cores"],
      answer: 1,
      explanation: "Load averages represent the average CPU and I/O run-queue backlog over 1, 5, and 15-minute windows.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the Niceness value range of a Linux process, and what does it influence?",
      options: ["From -20 (highest CPU priority) to +19 (lowest CPU priority / nicest to others)", "0 to 100", "1 to 5", "Always positive"],
      answer: 0,
      explanation: "Nice values range from -20 to 19; lower values give higher scheduling priority to the CPU.",
      difficulty: "Intermediate"
    },
    {
      q: "Which command changes the scheduling priority of an ALREADY RUNNING process with a known PID?",
      options: ["nice", "renice -n <value> -p <PID>", "chpri", "setpriority"],
      answer: 1,
      explanation: "nice launches new programs with altered priority; renice modifies the priority of existing running processes.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the 'at' command used for in Linux?",
      options: ["Running recurring tasks", "Executing a one-time command or script at a designated future time", "Finding files", "Sending emails"],
      answer: 1,
      explanation: "The at daemon (atd) schedules non-recurring tasks to execute once at a specified date and time.",
      difficulty: "Beginner"
    },
    {
      q: "Which command kills all processes matching a given process name rather than needing a PID?",
      options: ["killall process_name (or pkill)", "rm process_name", "halt process_name", "stop process_name"],
      answer: 0,
      explanation: "killall and pkill match process names or patterns and send signals without looking up individual PIDs.",
      difficulty: "Beginner"
    },
    {
      q: "What does the 'ps aux' command flag combination show?",
      options: ["Only root processes", "Every running process on the system (a: all users, u: user-oriented format with CPU/MEM, x: processes without a controlling tty)", "Only audio processes", "Network ports"],
      answer: 1,
      explanation: "ps aux displays a comprehensive BSD-style snapshot of all active processes across all users.",
      difficulty: "Beginner"
    },
    {
      q: "Which command displays kernel ring buffer messages and boot diagnostics?",
      options: ["journalctl -k (or dmesg)", "kernel_log", "kmsg", "bootlog"],
      answer: 0,
      explanation: "dmesg (and journalctl -k) prints hardware initialization and driver messages recorded in the kernel ring buffer.",
      difficulty: "Intermediate"
    }
  ],
  "linux-u4": [
    {
      q: "What is the maximum disk size supported by a legacy Master Boot Record (MBR) partition table?",
      options: ["512 GB", "2 TB (Tebibytes)", "4 TB", "16 TB"],
      answer: 1,
      explanation: "MBR uses 32-bit sector addressing with 512-byte sectors, limiting maximum addressable disk capacity to 2TB.",
      difficulty: "Intermediate"
    },
    {
      q: "How many primary partitions can an MBR partition table support directly?",
      options: ["2", "4 primary partitions (or 3 primary + 1 extended partition)", "8", "128"],
      answer: 1,
      explanation: "The MBR partition table allocates 64 bytes for partition records, accommodating at most 4 primary partitions.",
      difficulty: "Beginner"
    },
    {
      q: "What modern partitioning scheme replaces MBR, supporting disks larger than 2TB and up to 128 primary partitions?",
      options: ["GPT (GUID Partition Table)", "NTFS", "FAT32", "LVM"],
      answer: 0,
      explanation: "GPT is part of the UEFI standard, using 64-bit logical block addressing to support disks up to 9.4 ZB.",
      difficulty: "Beginner"
    },
    {
      q: "Which Linux utility displays block storage devices and partitions in a tree-like hierarchy?",
      options: ["lsblk", "fdisk -l", "blkid", "df"],
      answer: 0,
      explanation: "lsblk reads sysfs to list all storage block devices, sizes, mount points, and partition trees clearly.",
      difficulty: "Beginner"
    },
    {
      q: "What command creates an ext4 filesystem on partition /dev/sdb1?",
      options: ["format /dev/sdb1", "mkfs.ext4 /dev/sdb1", "ext4-create /dev/sdb1", "fsck /dev/sdb1"],
      answer: 1,
      explanation: "mkfs.ext4 (make filesystem) formats the block partition with the ext4 filesystem structure.",
      difficulty: "Beginner"
    },
    {
      q: "What configuration file contains persistent filesystem mount definitions loaded automatically during system boot?",
      options: ["/etc/mount.conf", "/etc/fstab", "/etc/filesystems", "/boot/grub.cfg"],
      answer: 1,
      explanation: "/etc/fstab (file system table) defines partitions, mount points, filesystem types, and mount options.",
      difficulty: "Beginner"
    },
    {
      q: "Why is it best practice to use UUIDs (Universally Unique Identifiers) in /etc/fstab instead of device node names like /dev/sdb1?",
      options: ["UUIDs make reads faster", "Device names (like /dev/sdb) can change unpredictably across reboots if drive order changes; UUIDs remain constant", "UUIDs encrypt the disk", "Kernel requires UUIDs"],
      answer: 1,
      explanation: "UUIDs identify storage volumes uniquely, preventing incorrect mounts if disks are reordered or detected differently.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the purpose of Logical Volume Management (LVM) in Linux?",
      options: ["To format USB drives", "To create flexible virtual storage volumes that can span multiple physical disks and be resized on the fly without unmounting", "To encrypt passwords", "To accelerate graphics"],
      answer: 1,
      explanation: "LVM abstracts physical storage into Physical Volumes, Volume Groups, and Logical Volumes for flexible dynamic resizing.",
      difficulty: "Intermediate"
    },
    {
      q: "In LVM architecture, what is the correct hierarchy from raw storage to usable mountable volume?",
      options: ["Physical Volumes (PV) -> Volume Group (VG) -> Logical Volumes (LV)", "Logical Volume -> Volume Group -> Physical Volume", "Volume Group -> Physical Volume -> Logical Volume", "Hard Drive -> File -> Volume"],
      answer: 0,
      explanation: "Raw disks become Physical Volumes (PVs), combined into a Volume Group (VG) pool, sliced into Logical Volumes (LVs).",
      difficulty: "Intermediate"
    },
    {
      q: "Which command checks and displays disk space usage of mounted filesystems in human-readable units (GB, MB)?",
      options: ["du -sh", "df -h", "free -m", "lsblk"],
      answer: 1,
      explanation: "df -h (disk free human-readable) summarizes filesystem space, used capacity, and available mount space.",
      difficulty: "Beginner"
    },
    {
      q: "What does the 'du -sh /var' command accomplish?",
      options: ["Formats /var", "Displays the summary (s) disk space used by the /var directory in human-readable (h) units", "Deletes /var files", "Scans for viruses"],
      answer: 1,
      explanation: "du (disk usage) with -s (summary total) and -h (human-readable) tallies total disk consumption of a directory.",
      difficulty: "Beginner"
    },
    {
      q: "What command is used to attach a storage partition /dev/sdb1 to an existing directory /mnt/data?",
      options: ["attach /dev/sdb1 /mnt/data", "mount /dev/sdb1 /mnt/data", "link /dev/sdb1 /mnt/data", "bind /dev/sdb1 /mnt/data"],
      answer: 1,
      explanation: "mount <device> <directory> attaches the storage filesystem into the unified Linux directory hierarchy.",
      difficulty: "Beginner"
    },
    {
      q: "What is Swap Space in Linux memory management?",
      options: ["Temporary RAM buffer", "Dedicated disk space used as virtual memory when physical RAM becomes exhausted", "CPU L1 cache", "Hard drive cache"],
      answer: 1,
      explanation: "Swap provides paging overflow on disk when RAM is constrained, moving inactive memory pages out.",
      difficulty: "Beginner"
    },
    {
      q: "Which command initializes a partition as Linux swap area?",
      options: ["mkswap /dev/sdb2", "swapon /dev/sdb2", "mkfs.swap /dev/sdb2", "swapinit /dev/sdb2"],
      answer: 0,
      explanation: "mkswap formats a designated partition or file with swap header structures.",
      difficulty: "Beginner"
    },
    {
      q: "What does the 'fsck' (File System Consistency Check) utility do?",
      options: ["Overclocks the hard drive", "Inspects and repairs filesystem metadata corruption and damaged disk blocks", "Defragments files", "Encrypts volumes"],
      answer: 1,
      explanation: "fsck scans filesystems for structural inconsistencies, broken directory chains, and repairs corrupted blocks.",
      difficulty: "Intermediate"
    },
    {
      q: "Which command displays the UUID and filesystem type of all storage partitions on the system?",
      options: ["blkid", "id", "fdisk", "mount"],
      answer: 0,
      explanation: "blkid locates and prints block device attributes, including UUIDs, PARTUUIDs, and filesystem labels.",
      difficulty: "Beginner"
    },
    {
      q: "What does the 'umount /mnt/data' command do, and what error occurs if a process has an open file in that directory?",
      options: ["Unmounts the filesystem; fails with 'target is busy' if a terminal or process is currently active inside the directory", "Deletes all files", "Formats the drive", "Unplugs the power"],
      answer: 0,
      explanation: "umount detaches the filesystem; if any process holds an open file handle, kernel blocks unmounting ('device busy').",
      difficulty: "Intermediate"
    },
    {
      q: "Which partitioning tool is best suited for interactive GPT partitioning on modern UEFI systems?",
      options: ["gdisk (or parted)", "old fdisk", "dosfs", "mkfs"],
      answer: 0,
      explanation: "gdisk is tailored specifically for GPT disks, supporting GUID partition tables natively.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the purpose of the 'noatime' mount option in /etc/fstab?",
      options: ["Disables clock syncing", "Prevents writing updated access timestamps every time a file is read, boosting disk read performance", "Enforces strict access time", "Logs read times"],
      answer: 1,
      explanation: "noatime skips writing access times on reads, substantially reducing disk write wear and latency on SSDs.",
      difficulty: "Advanced"
    },
    {
      q: "What command grows an ext4 filesystem online to fill expanded LVM logical volume space?",
      options: ["resize2fs /dev/vg0/lv_data", "growfs /dev/vg0/lv_data", "ext4-expand", "mkfs.ext4 -u"],
      answer: 0,
      explanation: "resize2fs dynamically resizes ext2/ext3/ext4 filesystems to fill enlarged logical volumes online.",
      difficulty: "Intermediate"
    }
  ],
  "linux-u5": [
    {
      q: "In Linux file permissions (rwxr-xr--), what are the octal numeric values for Read (r), Write (w), and Execute (x)?",
      options: ["r = 1, w = 2, x = 4", "r = 4, w = 2, x = 1", "r = 3, w = 2, x = 1", "r = 2, w = 4, x = 8"],
      answer: 1,
      explanation: "Standard POSIX permission weights are: Read (r) = 4, Write (w) = 2, Execute (x) = 1.",
      difficulty: "Beginner"
    },
    {
      q: "What numeric permission code grants the Owner Full permissions (rwx), Group Read and Execute (r-x), and Others Read only (r--)?",
      options: ["755", "754", "644", "777"],
      answer: 1,
      explanation: "Owner: 4+2+1 = 7; Group: 4+0+1 = 5; Others: 4+0+0 = 4 -> 754.",
      difficulty: "Beginner"
    },
    {
      q: "Which command changes the user and group ownership of a file named report.pdf to user 'kushal' and group 'staff'?",
      options: ["chmod kushal:staff report.pdf", "chown kushal:staff report.pdf", "chgrp kushal report.pdf", "own kushal:staff report.pdf"],
      answer: 1,
      explanation: "chown user:group filename updates both owner and group attributes.",
      difficulty: "Beginner"
    },
    {
      q: "What is the purpose of the SUID (Set User ID) special permission bit on an executable binary (e.g. /usr/bin/passwd)?",
      options: ["Encrypts the binary", "Allows users running the executable to execute it with the permissions of the file owner (typically root) rather than the executing user", "Allows only root to run it", "Locks the executable"],
      answer: 1,
      explanation: "SUID executes the binary with the file owner's privileges, enabling standard users to update /etc/shadow safely.",
      difficulty: "Intermediate"
    },
    {
      q: "What does the Sticky Bit permission on a shared directory (such as /tmp) enforce?",
      options: ["Prevents anyone from writing files", "Allows any user to create files, but files can only be deleted or renamed by the file owner or root", "Deletes files after 1 hour", "Makes files hidden"],
      answer: 1,
      explanation: "The sticky bit (octal 1000, chmod +t) prevents users from deleting each other's temporary files in public directories.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the Umask (User File-Creation Mode Mask) in Linux?",
      options: ["An antivirus filter", "A default octal mask subtracted from base permissions (666 for files, 777 for directories) when new files or directories are created", "A password hash", "A firewall rule"],
      answer: 1,
      explanation: "Umask filters out specific permissions automatically upon file creation (e.g. umask 022 leaves 755/644).",
      difficulty: "Intermediate"
    },
    {
      q: "If default directory base permission is 777 and umask is 027, what will be the permissions of a newly created directory?",
      options: ["750 (rwxr-x---)", "755", "720", "644"],
      answer: 0,
      explanation: "777 minus 027 = 750 (Owner: rwx = 7, Group: r-x = 5, Others: --- = 0).",
      difficulty: "Intermediate"
    },
    {
      q: "Which dedicated utility should ALWAYS be used to edit the /etc/sudoers file safely with syntax validation?",
      options: ["nano", "visudo", "vim /etc/sudoers directly", "gedit"],
      answer: 1,
      explanation: "visudo locks the file against concurrent edits and validates syntax before saving, preventing accidental system lockouts.",
      difficulty: "Beginner"
    },
    {
      q: "What does the SGID (Set Group ID) bit on a directory do?",
      options: ["Encrypts group files", "Causes any new files created inside that directory to automatically inherit the group ownership of the directory rather than the primary group of the creating user", "Locks the directory", "Deletes group users"],
      answer: 1,
      explanation: "SGID on directories ensures group collaboration by inheriting parent directory group ownership.",
      difficulty: "Intermediate"
    },
    {
      q: "In OpenSSH, where does a remote SSH server store the public keys of authorized client users for passwordless login?",
      options: ["~/.ssh/id_rsa", "~/.ssh/authorized_keys", "/etc/ssh/ssh_config", "/etc/shadow"],
      answer: 1,
      explanation: "Public keys added to ~/.ssh/authorized_keys allow corresponding private key holders to authenticate without passwords.",
      difficulty: "Beginner"
    },
    {
      q: "Which file contains the private SSH key generated by ssh-keygen on the local client machine?",
      options: ["id_rsa.pub", "id_rsa (never share this private key)", "known_hosts", "config"],
      answer: 1,
      explanation: "id_rsa is the private secret key and must remain confidential on the client machine.",
      difficulty: "Beginner"
    },
    {
      q: "What configuration setting in /etc/ssh/sshd_config should be set to 'no' on production servers to prevent brute-force attacks against the root account?",
      options: ["PermitRootLogin no", "AllowRoot false", "DisableRootAccess yes", "RootAuth 0"],
      answer: 0,
      explanation: "PermitRootLogin no disallows direct SSH logins as root, requiring users to log in as normal accounts and sudo.",
      difficulty: "Beginner"
    },
    {
      q: "What does the 'sudo' command allow an authorized user to do?",
      options: ["Bypass firewalls", "Execute an administrative command with the security privileges of the superuser (root) as specified in /etc/sudoers", "Switch permanently to root without logging", "Create SSH keys"],
      answer: 1,
      explanation: "sudo (SuperUser DO) executes commands with elevated privileges while logging actions for auditing.",
      difficulty: "Beginner"
    },
    {
      q: "Which command recursively changes permissions on all files and subdirectories in /var/www to 755?",
      options: ["chmod 755 /var/www", "chmod -R 755 /var/www", "chown -R 755 /var/www", "chmod -a 755 /var/www"],
      answer: 1,
      explanation: "The -R (recursive) flag applies permissions across all nested directory contents.",
      difficulty: "Beginner"
    },
    {
      q: "What does a file permission string like '-rwsr-xr-x' indicate?",
      options: ["The file is a directory", "The file has SUID enabled (indicated by 's' in the owner execute position)", "The file is corrupt", "The file is read-only"],
      answer: 1,
      explanation: "The letter 's' in place of 'x' in the owner permissions indicates the SUID bit is set.",
      difficulty: "Intermediate"
    },
    {
      q: "What does 'chmod g+w filename' do using symbolic permission notation?",
      options: ["Adds write permission for the Group", "Adds read permission for Owner", "Removes write permission", "Grants global write"],
      answer: 0,
      explanation: "g+w targets group (g) and adds (+) write (w) permissions.",
      difficulty: "Beginner"
    },
    {
      q: "Which file stores the actual encrypted password hashes and password expiration parameters for Linux users?",
      options: ["/etc/passwd", "/etc/shadow", "/etc/group", "/etc/security"],
      answer: 1,
      explanation: "/etc/shadow is readable only by root (permissions 000 or 640) and stores salt-hashed passwords.",
      difficulty: "Beginner"
    },
    {
      q: "What is SELinux (Security-Enhanced Linux)?",
      options: ["An antivirus tool", "A Mandatory Access Control (MAC) kernel architecture providing fine-grained security policies beyond standard Discretionary Access Control (DAC)", "A password manager", "A network firewall"],
      answer: 1,
      explanation: "SELinux implements Mandatory Access Control, enforcing strict label-based policies on process capabilities.",
      difficulty: "Advanced"
    },
    {
      q: "What are the three operational modes of SELinux?",
      options: ["Active, Passive, Disabled", "Enforcing, Permissive, Disabled", "Strict, Soft, Off", "Root, User, Guest"],
      answer: 1,
      explanation: "Enforcing blocks unauthorized actions; Permissive logs violations without blocking; Disabled turns SELinux off.",
      difficulty: "Intermediate"
    },
    {
      q: "Which file records the host key fingerprints of remote servers you have previously connected to via SSH?",
      options: ["~/.ssh/known_hosts", "~/.ssh/authorized_keys", "/etc/hosts", "~/.ssh/config"],
      answer: 0,
      explanation: "known_hosts stores public keys of visited servers, alerting users if a server's key changes (potential MitM).",
      difficulty: "Intermediate"
    }
  ],
  "linux-u6": [
    {
      q: "Which command is used to create a new user account named 'student' in modern Linux systems?",
      options: ["useradd -m student (or adduser student)", "newuser student", "createuser student", "mkuser student"],
      answer: 0,
      explanation: "useradd -m creates the user and initializes their home directory (/home/student).",
      difficulty: "Beginner"
    },
    {
      q: "What information is stored in the 7 colon-separated fields of the '/etc/passwd' file?",
      options: ["Username, Password flag (x), UID, GID, GECOS/Full Name, Home directory, Default login shell", "Passwords and credit cards", "File permissions only", "System boot parameters"],
      answer: 0,
      explanation: "/etc/passwd stores: username:x:UID:GID:comment:home_directory:login_shell.",
      difficulty: "Intermediate"
    },
    {
      q: "Which command adds an existing user 'kushal' to an auxiliary supplementary group 'docker' without removing them from other groups?",
      options: ["usermod -g docker kushal", "usermod -aG docker kushal", "useradd -G docker kushal", "groupadd kushal docker"],
      answer: 1,
      explanation: "usermod with -a (append) and -G (supplementary group) adds the group without wiping other memberships.",
      difficulty: "Intermediate"
    },
    {
      q: "What command locks a user account's password, preventing them from logging in?",
      options: ["passwd -l username (or usermod -L username)", "passwd -d username", "userdel username", "lock username"],
      answer: 0,
      explanation: "passwd -l prepends an exclamation mark '!' to the encrypted password string in /etc/shadow, disabling password auth.",
      difficulty: "Beginner"
    },
    {
      q: "What command is used to manage password aging and expiration policies (e.g. max days, warning days) for a Linux user?",
      options: ["chage", "passwd -e", "expire", "usermod -p"],
      answer: 0,
      explanation: "chage (change age) configures password validity periods, warning countdowns, and account expiration dates.",
      difficulty: "Intermediate"
    },
    {
      q: "Which command permanently deletes a user account AND removes their home directory and mail spool?",
      options: ["userdel -r username", "userdel username", "rmuser username", "killuser username"],
      answer: 0,
      explanation: "The -r flag instructs userdel to remove the user's home directory and mail spool.",
      difficulty: "Beginner"
    },
    {
      q: "What is the primary difference between a Docker Container and a traditional Virtual Machine (VM)?",
      options: ["Containers run their own complete guest operating system kernel; VMs share the host kernel", "Containers share the host OS kernel and isolate user-space via Linux namespaces and cgroups, making them lightweight and fast; VMs virtualize entire hardware with guest OS kernels", "Containers are hardware chips", "VMs do not use RAM"],
      answer: 1,
      explanation: "Containers package only application and dependencies on a shared host kernel, whereas VMs emulate full hardware and guest kernels.",
      difficulty: "Intermediate"
    },
    {
      q: "Which Linux kernel feature provides process resource isolation (CPU, memory, disk I/O limits) for Docker containers?",
      options: ["Control Groups (cgroups)", "Namespaces", "SELinux", "Systemd"],
      answer: 0,
      explanation: "cgroups meter and throttle hardware resource consumption (memory, CPU shares, block I/O) across container groups.",
      difficulty: "Intermediate"
    },
    {
      q: "Which Linux kernel feature provides process visibility isolation (isolated PIDs, mount points, network interfaces) for containers?",
      options: ["Namespaces (PID, NET, MNT, IPC, UTS, USER)", "cgroups", "cron", "IPTables"],
      answer: 0,
      explanation: "Namespaces partition system resources so a container perceives its own isolated process table, network stack, and mounts.",
      difficulty: "Intermediate"
    },
    {
      q: "What is a Dockerfile?",
      options: ["A compressed zip archive", "A plain text script containing sequential commands and instructions to automatically build a Docker container image", "A database file", "A Linux kernel patch"],
      answer: 1,
      explanation: "A Dockerfile contains instructions (FROM, RUN, COPY, EXPOSE, CMD) that assemble a container image layer by layer.",
      difficulty: "Beginner"
    },
    {
      q: "Which Docker CLI command launches a new container in detached background mode (-d) with port forwarding from host 8080 to container 80?",
      options: ["docker run -d -p 8080:80 nginx", "docker start -p 8080:80 nginx", "docker build -p 8080:80 nginx", "docker exec -d nginx"],
      answer: 0,
      explanation: "docker run -d -p 8080:80 nginx fetches the image, maps port 8080 to container port 80, and runs in background.",
      difficulty: "Beginner"
    },
    {
      q: "What is the command to list all currently running Docker containers?",
      options: ["docker list", "docker ps", "docker images", "docker status"],
      answer: 1,
      explanation: "docker ps lists active running containers (docker ps -a lists all including stopped ones).",
      difficulty: "Beginner"
    },
    {
      q: "Which package management tool is standard on Debian and Ubuntu Linux distributions?",
      options: ["apt (Advanced Package Tool) / dpkg", "dnf / rpm", "pacman", "yum"],
      answer: 0,
      explanation: "Debian and Ubuntu use apt and dpkg for .deb package management.",
      difficulty: "Beginner"
    },
    {
      q: "Which package management tool is used on Red Hat Enterprise Linux, Fedora, and Rocky Linux?",
      options: ["apt", "dnf / yum / rpm", "brew", "emerge"],
      answer: 1,
      explanation: "RHEL derivatives utilize dnf (Dandified YUM) and rpm for .rpm package archives.",
      difficulty: "Beginner"
    },
    {
      q: "What is the difference between a Docker Image and a Docker Container?",
      options: ["An Image is a read-only immutable blueprint/template; a Container is a live, running instance of an image with a writable layer", "They are identical terms", "Containers are stored in Docker Hub; images run on servers", "Images use more RAM"],
      answer: 0,
      explanation: "Images are inert build templates; containers are dynamic runtime instantiations with a thin read/write layer.",
      difficulty: "Beginner"
    },
    {
      q: "What command creates a new group named 'developers'?",
      options: ["groupadd developers", "addgroup developers", "newgroup developers", "mkgroup developers"],
      answer: 0,
      explanation: "groupadd creates a new group definition entry in /etc/group.",
      difficulty: "Beginner"
    },
    {
      q: "What does the UID 0 always represent in any Linux operating system?",
      options: ["A disabled guest account", "The root superuser account with unrestricted administrative access", "The system installer", "The default login shell"],
      answer: 1,
      explanation: "In Linux, user ID 0 (UID 0) is hardcoded into the kernel as the root superuser.",
      difficulty: "Beginner"
    },
    {
      q: "What is the command to open an interactive BASH shell inside an already running Docker container named 'webserver'?",
      options: ["docker exec -it webserver /bin/bash", "docker run -it webserver bash", "docker ssh webserver", "docker open webserver"],
      answer: 0,
      explanation: "docker exec -it <container> /bin/bash attaches an interactive pseudo-TTY session inside the active container.",
      difficulty: "Intermediate"
    },
    {
      q: "What is Docker Volume used for in containerized applications?",
      options: ["Increasing audio volume", "Persisting data generated by and used by Docker containers outside the container's lifecycle on the host filesystem", "Virtual RAM", "Compressing files"],
      answer: 1,
      explanation: "Volumes decouple data persistence from the container container lifecycle so data survives container deletion.",
      difficulty: "Intermediate"
    },
    {
      q: "What does 'docker stop container_id' do before terminating a container?",
      options: ["Immediately cuts power", "Sends SIGTERM to allow graceful shutdown, waiting 10 seconds before falling back to SIGKILL", "Deletes container files", "Restarts the container"],
      answer: 1,
      explanation: "docker stop sends SIGTERM to PID 1, allows grace period (default 10s), then issues SIGKILL if unresponsive.",
      difficulty: "Intermediate"
    }
  ]
};
