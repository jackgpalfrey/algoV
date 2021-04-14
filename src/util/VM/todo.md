# TODO:

[ ] Move PartitionMap system out of CPU and into seperate class. (Requires CPU to be split into a CPU and VM). MemoryMap should essentially be invisible to CPU which should just be able to read and write to the memory map and it should do the rest